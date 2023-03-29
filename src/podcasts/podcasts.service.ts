import { Injectable, NotFoundException } from "@nestjs/common";
import { Podcast } from "./entities/podcast.entity";
import { GetPodcastsOutput } from "./dtos/getPodcasts.dto";
import { GetPodcastInput, GetPodcastOutput } from "./dtos/getPodcast.dto";
import { CreatePodcastInput, CreatePodcastOutput } from "./dtos/createPodcast.dto";
import { DeletePodcastInput, DeletePodcastOutput } from "./dtos/deletePodcast.dto";
import { UpdatePodcastInput, UpdatePodcastOutput } from "./dtos/updatePodcast.dto";
import { GetEpisodesInput, GetEpisodesOutput } from "./dtos/getEpisodes.dto";
import { CreateEpisodeInput, CreateEpisodeOutput } from "./dtos/createEpisode.dto";
import { DeleteEpisodeInput, DeleteEpisodeOutput } from "./dtos/deleteEpisode.dto";
import { UpdateEpisodeInput, UpdateEpisodeOutput } from "./dtos/updateEpisode.dto";

@Injectable()
export class PodcastsService {
    private podcasts: Podcast[] = [];

    async getPodcasts(): Promise<GetPodcastsOutput> {
        try {
            return {
                ok: true,
                results: this.podcasts,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not load podcasts.",
            };
        }
    }

    async getPodcast(getPodcastInput: GetPodcastInput): Promise<GetPodcastOutput> {
        try {
            const podcast = this.podcasts.find(
                podcast => podcast.id === +getPodcastInput.podcastId,
            );
            if (!podcast) {
                throw new NotFoundException(
                    `Podcast with ID ${getPodcastInput.podcastId} not found.`,
                );
            }
            return {
                ok: true,
                result: podcast,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not found Podcast.",
            };
        }
    }

    async createPodcast(createPodcastInput: CreatePodcastInput): Promise<CreatePodcastOutput> {
        try {
            this.podcasts.push({
                id: this.podcasts.length + 1,
                ...createPodcastInput,
                episodes: [],
            });
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not create Podcast.",
            };
        }
    }

    async deletePodcast(deletePodcastInput: DeletePodcastInput): Promise<DeletePodcastOutput> {
        try {
            await this.getPodcast({ podcastId: deletePodcastInput.podcastId });
            this.podcasts = this.podcasts.filter(
                podcast => podcast.id !== +deletePodcastInput.podcastId,
            );
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not delete Podcast.",
            };
        }
    }

    async updatePodcast(updatePodcastInput: UpdatePodcastInput): Promise<UpdatePodcastOutput> {
        try {
            const podcast = await this.getPodcast({ podcastId: updatePodcastInput.podcastId });
            await this.deletePodcast({ podcastId: updatePodcastInput.podcastId });
            this.podcasts.push({
                id: updatePodcastInput.podcastId,
                rating: updatePodcastInput.rating,
                title: updatePodcastInput.title,
                category: updatePodcastInput.category,
                episodes: podcast.result.episodes,
            });
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not update Podcast.",
            };
        }
    }

    async getEpisodes(getEpisodesInput: GetEpisodesInput): Promise<GetEpisodesOutput> {
        try {
            const podcast = await this.getPodcast({ podcastId: getEpisodesInput.podcastId });
            return {
                ok: true,
                result: podcast.result.episodes,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not found Episodes.",
            };
        }
    }

    async createEpisode(createEpisodeInput: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
        try {
            const podcast = await this.getPodcast({ podcastId: createEpisodeInput.podcastId });
            podcast.result.episodes.push({
                id: podcast.result.episodes.length + 1,
                title: createEpisodeInput.title,
                description: createEpisodeInput.description,
            });
            await this.updatePodcast({
                podcastId: createEpisodeInput.podcastId,
                ...podcast.result,
            });
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not create Episode.",
            };
        }
    }

    async deleteEpisode(deleteEpisodeInput: DeleteEpisodeInput): Promise<DeleteEpisodeOutput> {
        try {
            const podcast = await this.getPodcast({ podcastId: deleteEpisodeInput.podcastId });
            const episodes = podcast.result.episodes.filter(
                episode => episode.id !== +deleteEpisodeInput.episodeId,
            );
            podcast.result.episodes = [...episodes];
            await this.updatePodcast({
                podcastId: deleteEpisodeInput.podcastId,
                rating: podcast.result.rating,
                title: podcast.result.title,
                category: podcast.result.category,
                episodes: podcast.result.episodes,
            });
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not delete Episode.",
            };
        }
    }

    async updateEpisode(updateEpisodeInput: UpdateEpisodeInput): Promise<UpdateEpisodeOutput> {
        try {
            await this.getPodcast({ podcastId: updateEpisodeInput.podcastId });
            await this.deleteEpisode({
                podcastId: updateEpisodeInput.podcastId,
                episodeId: updateEpisodeInput.id,
            });
            await this.createEpisode({
                podcastId: updateEpisodeInput.podcastId,
                title: updateEpisodeInput.title,
                description: updateEpisodeInput.description,
            });
            return {
                ok: true,
            };
        } catch (e) {
            return {
                ok: false,
                error: "Could not update Episode.",
            };
        }
    }
}

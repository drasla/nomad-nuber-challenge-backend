import { Injectable, NotFoundException } from "@nestjs/common";
import { Podcast } from "./entities/podcast.entity";

@Injectable()
export class PodcastsService {
    private podcasts: Podcast[] = [];

    getAll(): Podcast[] {
        return this.podcasts;
    }

    getOne(id: number): Podcast {
        const podcast = this.podcasts.find(podcast => podcast.id === +id);
        if (!podcast) {
            throw new NotFoundException(`Podcast with ID ${id} not found.`);
        }
        return podcast;
    }

    create(podcastData) {
        this.podcasts.push({
            id: this.podcasts.length + 1,
            ...podcastData,
        });
    }

    deleteOne(podcastId: number) {
        this.getOne(podcastId);
        this.podcasts = this.podcasts.filter(podcast => podcast.id !== +podcastId);
    }

    update(podcastId: number, updateData) {
        const podcast = this.getOne(podcastId);
        this.deleteOne(podcastId);
        this.podcasts.push({
            ...podcast,
            ...updateData,
        });
    }

    getEpisodes(podcastId: number) {
        const podcast = this.getOne(podcastId);
        return podcast.episodes;
    }

    createEpisode(podcastId: number, episodeData) {
        const podcast = this.getOne(podcastId);
        podcast.episodes.push({
            id: podcast.episodes.length + 1,
            ...episodeData,
        });
        this.update(podcastId, podcast);
    }

    deleteEpisode(podcastId: number, episodeId: number) {
        const podcast = this.getOne(podcastId);
        const episodes = podcast.episodes.filter(episode => episode.id !== +episodeId);
        podcast.episodes = [...episodes];
        this.update(podcastId, { ...podcast });
    }

    updateEpisode(podcastId: number, episodeId: number, updateData) {
        this.deleteEpisode(podcastId, episodeId);
        this.createEpisode(podcastId, updateData);
    }
}

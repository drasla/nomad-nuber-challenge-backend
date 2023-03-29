import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Podcast } from "./entities/podcast.entity";
import { PodcastsService } from "./podcasts.service";
import { GetPodcastsOutput } from "./dtos/getPodcasts.dto";
import { GetPodcastInput, GetPodcastOutput } from "./dtos/getPodcast.dto";
import { CreatePodcastInput, CreatePodcastOutput } from "./dtos/createPodcast.dto";
import { DeletePodcastInput, DeletePodcastOutput } from "./dtos/deletePodcast.dto";
import { UpdatePodcastInput, UpdatePodcastOutput } from "./dtos/updatePodcast.dto";
import { GetEpisodesInput, GetEpisodesOutput } from "./dtos/getEpisodes.dto";
import { DeleteEpisodeInput, DeleteEpisodeOutput } from "./dtos/deleteEpisode.dto";
import { UpdateEpisodeInput, UpdateEpisodeOutput } from "./dtos/updateEpisode.dto";

@Resolver(() => Podcast)
export class PodcastsResolver {
    constructor(private readonly podcastsService: PodcastsService) {}

    @Query(() => GetPodcastsOutput)
    getPodcasts(): Promise<GetPodcastsOutput> {
        return this.podcastsService.getPodcasts();
    }

    @Query(() => GetPodcastOutput)
    getPodcast(@Args("input") getPodcastInput: GetPodcastInput): Promise<GetPodcastOutput> {
        return this.podcastsService.getPodcast(getPodcastInput);
    }

    @Query(() => GetEpisodesInput)
    getEpisodes(@Args("input") getEpisodesInput: GetEpisodesInput): Promise<GetEpisodesOutput> {
        return this.podcastsService.getEpisodes(getEpisodesInput);
    }

    @Mutation(() => CreatePodcastOutput)
    createPodcast(
        @Args("input") createPodcastInput: CreatePodcastInput,
    ): Promise<CreatePodcastOutput> {
        return this.podcastsService.createPodcast(createPodcastInput);
    }

    @Mutation(() => DeletePodcastOutput)
    deletePodcast(
        @Args("input") deletePodcastInput: DeletePodcastInput,
    ): Promise<DeletePodcastOutput> {
        return this.podcastsService.deletePodcast(deletePodcastInput);
    }

    @Mutation(() => UpdatePodcastOutput)
    updatePodcast(
        @Args("input") updatePodcastInput: UpdatePodcastInput,
    ): Promise<UpdatePodcastOutput> {
        return this.podcastsService.updatePodcast(updatePodcastInput);
    }

    @Mutation(() => DeleteEpisodeOutput)
    deleteEpisode(
        @Args("input") deleteEpisodeInput: DeleteEpisodeInput,
    ): Promise<DeleteEpisodeOutput> {
        return this.podcastsService.deleteEpisode(deleteEpisodeInput);
    }

    @Mutation(() => UpdateEpisodeOutput)
    updateEpisode(
        @Args("input") updateEpisodeInput: UpdateEpisodeInput,
    ): Promise<UpdateEpisodeOutput> {
        return this.podcastsService.updateEpisode(updateEpisodeInput);
    }
}

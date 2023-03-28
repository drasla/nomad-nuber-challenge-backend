import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PodcastsService } from "./podcasts.service";
import { Podcast } from "./entities/podcast.entity";

@Controller("podcasts")
export class PodcastsController {
    constructor(private readonly podcastsService: PodcastsService) {}

    @Get()
    getAll(): Podcast[] {
        return this.podcastsService.getAll();
    }

    @Post()
    create(@Body() podcastData) {
        return this.podcastsService.create(podcastData);
    }

    @Get(":id")
    getOne(id: number): Podcast {
        return this.podcastsService.getOne(id);
    }

    @Patch(":id")
    patch(@Param("id") podcastId: number, @Body() updateData) {
        return this.podcastsService.update(podcastId, updateData);
    }

    @Delete(":id")
    remove(@Param("id") podcastId: number) {
        return this.podcastsService.deleteOne(podcastId);
    }

    @Get(":podcastId/episodes")
    getEpisodes(@Param("podcastId") podcastId: number) {
        return this.podcastsService.getEpisodes(podcastId);
    }

    @Post(":podcastId/episodes")
    createEpisode(@Param("podcastId") podcastId: number, @Body() episodeData) {
        return this.podcastsService.createEpisode(podcastId, episodeData);
    }

    @Patch(":podcastId/episodes/:episodeId")
    patchEpisode(
        @Param("podcastId") podcastId: number,
        @Param("episodeId") episodeId: number,
        @Body() updateData,
    ) {
        return this.podcastsService.updateEpisode(podcastId, episodeId, updateData);
    }

    @Delete("podcastId/episodes/:episodeId")
    deleteEpisode(@Param("podcastId") podcastId: number, @Param("episodeId") episodeId: number) {
        return this.podcastsService.deleteEpisode(podcastId, episodeId);
    }
}

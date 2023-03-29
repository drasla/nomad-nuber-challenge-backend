import { Field, InputType } from "@nestjs/graphql";
import { CommonOutput } from "../../common/dtos/output.dto";
import { Podcast } from "../entities/podcast.entity";

@InputType()
export class GetPodcastInput {
    @Field(() => Number)
    podcastId: number;
}

export class GetPodcastOutput extends CommonOutput {
    @Field(() => Podcast, { nullable: true })
    result?: Podcast;
}

import { Field, ObjectType } from "@nestjs/graphql";
import { CommonOutput } from "../../common/dtos/output.dto";
import { Podcast } from "../entities/podcast.entity";

@ObjectType()
export class GetPodcastsOutput extends CommonOutput {
    @Field(() => [Podcast], { nullable: true })
    results?: Podcast[];
}

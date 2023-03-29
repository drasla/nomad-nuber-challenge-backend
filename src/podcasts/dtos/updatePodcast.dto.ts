import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CreatePodcastInput } from "./createPodcast.dto";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class UpdatePodcastInput extends PartialType(CreatePodcastInput) {
    @Field(() => Number)
    podcastId: number;
}

@ObjectType()
export class UpdatePodcastOutput extends CommonOutput {}

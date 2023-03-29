import { Field, InputType } from "@nestjs/graphql";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class DeletePodcastInput {
    @Field(() => Number)
    podcastId: number;
}

export class DeletePodcastOutput extends CommonOutput {}

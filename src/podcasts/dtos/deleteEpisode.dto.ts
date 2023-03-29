import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class DeleteEpisodeInput {
    @Field(() => Number)
    podcastId: number;

    @Field(() => Number)
    episodeId: number;
}

@ObjectType()
export class DeleteEpisodeOutput extends CommonOutput {}

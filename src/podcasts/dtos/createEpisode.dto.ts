import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Episode } from "../entities/episodes.entity";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class CreateEpisodeInput extends PickType(Episode, ["title", "description"]) {
    @Field(() => Number)
    podcastId: number;
}

@ObjectType()
export class CreateEpisodeOutput extends CommonOutput {}

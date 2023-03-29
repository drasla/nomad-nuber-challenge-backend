import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { Episode } from "../entities/episodes.entity";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class UpdateEpisodeInput extends PartialType(Episode) {
    @Field(() => Number)
    podcastId: number;
}

@ObjectType()
export class UpdateEpisodeOutput extends CommonOutput {}

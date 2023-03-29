import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CommonOutput } from "../../common/dtos/output.dto";
import { Episode } from "../entities/episodes.entity";

@InputType()
export class GetEpisodesInput {
    @Field(() => Number)
    podcastId: number;
}

@ObjectType()
export class GetEpisodesOutput extends CommonOutput {
    @Field(() => [Episode], { nullable: true })
    result?: Episode[];
}

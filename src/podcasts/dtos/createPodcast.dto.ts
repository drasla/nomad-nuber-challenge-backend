import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Podcast } from "../entities/podcast.entity";
import { CommonOutput } from "../../common/dtos/output.dto";

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
    "title",
    "rating",
    "category",
    "episodes",
]) {}

@ObjectType()
export class CreatePodcastOutput extends CommonOutput {}

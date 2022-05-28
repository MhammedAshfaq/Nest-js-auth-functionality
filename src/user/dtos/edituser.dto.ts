import { PartialType,OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class EdituserDto extends PartialType (
    OmitType(CreateUserDto,[])
){}

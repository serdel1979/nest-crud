import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto{

 
    @IsNotBlank({message:'el nombre no debe estar vacío'})
    name?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    precio?: number;
}
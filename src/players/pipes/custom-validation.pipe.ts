import { ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';

export class CustomValidationPipe2 implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value) {
            throw new BadRequestException(`You must inform ${metadata.data} value.`);
        } else {
            console.log(`Value: ${ value }, Metadata: ${ metadata.type }`);
            return value;
        }
    }

}
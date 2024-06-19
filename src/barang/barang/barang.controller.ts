import { Controller, Post, Res } from '@nestjs/common';
import { BarangRepository } from '../barang-repository/barang-repository';

@Controller('barang')
export class BarangController {
    constructor(private barangRepository:BarangRepository){}

    @Post('insert-banyak')
    async insertBanyakBarang(@Res() response){
        // return this.userRepository.save(name, lastName)


        const dataBarangss = [
            {name: 'le mineral', price: 5000}, 
            {name: 'Evo', price: 25000}, 
            {name: 'Korek', price: 2000}, 
        ]
        
        try {
            for (let index = 0; index < 600000; index++) {
                await this.barangRepository.save(dataBarangss)
            }
            
            
            return response.status(200).send({
                status: 'success'
            })
        } catch (error) {
            return response.status(500).send(error)

        }
    }
}

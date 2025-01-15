import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    //Injeção de dependências
    constructor(private readonly userService: UserService) {}

    @Get('list')
    async getAllUsers(): Promise<Partial<UserModel>[]> {
        return this.userService.users({});
    }

    @Post()
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({ id: Number(id) });
    }

    @Patch()
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}

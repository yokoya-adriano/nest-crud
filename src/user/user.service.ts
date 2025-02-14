import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    //Injeção de dependências
    @Inject()
    private readonly prisma: PrismaService;

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<Partial<User>[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<Omit<User, 'password'> | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            select: {
                id: true,
                email: true,
                name: true,
                password: false,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const hashPassword = await bcrypt.hash(data.password, 12);

        return await this.prisma.user.create({
            data: { ...data, password: hashPassword },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<{ message: string; error?: string }> {
        try {
            const { where, data } = params;
            await this.prisma.user.update({
                data,
                where,
            });

            return { message: 'Update feito com sucesso!' };
        } catch (error) {
            return {
                error: error.message,
                message: 'Ocorreu algum erro no update',
            };
        }
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}

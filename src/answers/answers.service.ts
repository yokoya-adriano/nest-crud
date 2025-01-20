import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
    @Inject()
    private readonly prisma: PrismaService;

    async create(
        createAnswerDto: CreateAnswerDto,
        userId: any,
        questionId: number,
    ) {
        const newAnswer = {
            body: createAnswerDto.body,
            user: {
                connect: {
                    id: userId.sub,
                },
            },
            question: {
                connect: {
                    id: questionId,
                },
            },
        };

        try {
            await this.prisma.answers.create({
                data: newAnswer,
            });

            return { message: 'Resposta criada com sucesso!' };
        } catch (error) {
            return {
                error: error.message,
                message: 'Ocorreu um erro ao criar a resposta',
            };
        }
    }

    findAll() {
        return this.prisma.answers.findMany();
    }

    findOne(id: number) {
        return this.prisma.answers.findUnique({ where: { id } });
    }

    update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return this.prisma.answers.update({
            where: { id },
            data: updateAnswerDto,
        });
    }

    remove(id: number) {
        return this.prisma.answers.delete({ where: { id } });
    }
}

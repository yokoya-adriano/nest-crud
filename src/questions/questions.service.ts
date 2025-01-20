import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
    @Inject()
    private readonly prisma: PrismaService;

    async create(createQuestionDto: CreateQuestionDto, req: any) {
        console.log(req);

        try {
            await this.prisma.questions.create({
                data: { ...createQuestionDto, userId: req.sub.sub },
            });
            return { message: 'Questão criada com sucesso!' };
        } catch (error) {
            return {
                error: error.message,
                message: 'Ocorreu um erro ao criar a questão',
            };
        }
    }

    async findAll() {
        return await this.prisma.questions.findMany({
            include: {
                answers: true,
                user: { select: { id: true, email: true, name: true } },
            },
        });
    }

    async findOne(id: number) {
        return await this.prisma.questions.findUnique({
            where: { id },
            include: {
                answers: true,
                user: { select: { id: true, email: true, name: true } },
            },
        });
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return await this.prisma.questions.update({
            where: { id },
            data: updateQuestionDto,
        });
    }

    async remove(id: number) {
        return await this.prisma.questions.delete({ where: { id } });
    }
}

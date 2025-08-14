import { Injectable } from '@nestjs/common';
import { EditUserDto } from 'src/users/dto';
import { CreateBookmarksDto, EditBookmarksDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    async createBookmarks(userId: number, dto: CreateBookmarksDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
        return bookmark;
    }


    async getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({ where: { userId } })
    }


    async getBookmarksById(userId: number, bookmarkId: number) { }


    async editBookmarksById(userId: number, bookmarkId: number, dot: EditBookmarksDto) { }


    async deleteBookmarksById(userId: number, bookmarkId: number) { }
}

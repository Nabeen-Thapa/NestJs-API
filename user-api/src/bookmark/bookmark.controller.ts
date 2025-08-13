import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { CreateBookmarksDto, EditBookmarksDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) { }
    @Post()
    async createBookmarks(@GetUser('id') userId: number, @Body() dto: CreateBookmarksDto) {
        return this.bookmarkService.createBookmarks(userId, dto)
    }

    @Get()
    async getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId)
    }

    @Get(':id')
    async getBookmarksById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmarksById(userId, bookmarkId)
    }

    @Patch(':id')
    async editBookmarksById(@GetUser('id') userId: number, @Body() dto: EditBookmarksDto, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.editBookmarksById(userId, bookmarkId, dto)
    }

    @Delete(':id')
    async deleteBookmarksById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmarksById(userId, bookmarkId)
    }
}

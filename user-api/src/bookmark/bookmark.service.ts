import { Injectable } from '@nestjs/common';
import { EditUserDto } from 'src/users/dto';
import { CreateBookmarksDto, EditBookmarksDto } from './dto';

@Injectable()
export class BookmarkService {


    async createBookmarks(userId: number, dot: CreateBookmarksDto) { }


    async getBookmarks(userId: number) { }


    async getBookmarksById(userId: number, bookmarkId: number) { }


    async editBookmarksById(userId: number, bookmarkId: number, dot: EditBookmarksDto) { }


    async deleteBookmarksById(userId: number, bookmarkId:number) { }
}

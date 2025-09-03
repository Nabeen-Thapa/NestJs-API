import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

        async viewUser() {
            try {
    
            } catch (error) {
                console.log("user view chat controller error:", error.message);
                return error;
            }
        }
       

        async updateUser() {
            try {
    
            } catch (error) {
                console.log("user view chat controller error:", error.message);
                return error;
            }
        }

        async deleteUser() {
            try {
    
            } catch (error) {
                console.log("user view chat controller error:", error.message);
                return error;
            }
        }
}

import { Injectable } from '@angular/core'; 
import {  
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc  
} from '@angular/fire/firestore'; 
import { Observable } from 'rxjs'; 
import { LoginInfo, UsersService } from '../users.service';
import { UserCredential } from '@angular/fire/auth';
 
export interface Register { 
  uid: string; 
  email: string; 
  nickname: string; 
  phoneNumber: string; 
  photoURL: string; 
  role: string; 
} 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class RegistersService { 
  currentRegister: Register | null = null; // Añadir la propiedad currentRegister

  constructor(private firestore: Firestore, private usersService: UsersService) { } 

  getRegisters(): Observable<Register[]> { 
    const registersRef = collection(this.firestore, 'registers'); 
    return collectionData(registersRef, { idField: 'uid' }); 
  } 

  getRegister(uid: string): Observable<Register> { 
    const docRef = doc(this.firestore, `registers/${uid}`); 
    return collectionData(docRef, { idField: 'uid' }); 
  }
 
  async createRegister(loginInfo: LoginInfo, { email, nickname, phoneNumber, photoURL, role }: Register): Promise<any> {
    const userCredential: UserCredential = await this.usersService.register(loginInfo)
      .catch((error) => {
        console.log(error);
        return error;
      });
    const uid = userCredential.user.uid;
    
    const registersRef = collection(this.firestore, 'registers'); 
    return addDoc(registersRef, { email, nickname, phoneNumber, photoURL, role }); 
  } 

  async createRegisterWithGoogle({}: Register): Promise<any> {
    const userCredential: UserCredential = await this.usersService.loginWithGoogle()
      .catch((error) => {
        console.log(error);
        return error;
      });
    const uid = userCredential.user.uid;
    const photoURL = userCredential.user.photoURL!;
    const nickname = userCredential.user.displayName!;
    const email = userCredential.user.email!;
    const phoneNumber = userCredential.user.phoneNumber!;
    const role = "empleado";
    
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef, { email, nickname, phoneNumber, photoURL, role });
  }

  setRegisters(registers: Register): void {
    this.currentRegister = registers;
  }
  
  // Métodos de actualización y eliminación comentados en tu código
}

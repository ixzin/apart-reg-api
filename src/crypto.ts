import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = 'gorfintrest'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');

export class Crypto {

  public static encrypt(text) : string {
    var cipher = crypto.createCipher(algorithm,ENCRYPTION_KEY)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  public static decrypt(text):string {
    var decipher = crypto.createDecipher(algorithm,ENCRYPTION_KEY)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
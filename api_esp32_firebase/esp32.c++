#include <WiFi.h>
#include <FirebaseESP32.h>


const char* usuario = "";
const char* senha = "";
bool statusConexao = false;

const char* host = "";
const char* token = "";

FirebaseData minhaBase;

void setup() {
  Serial.begin(115200);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(18,OUTPUT);
  pinMode(23,OUTPUT);


  WiFi.begin(usuario,senha);

  while(WiFi.status() !=WL_CONNECTED) {
    delay(1000);
    }
  statusConexao = true;
  Firebase.begin(host, token);
}

void loop() {
  //if(statusConexao == true){ 
   // digitalWrite(4, HIGH);
   // Firebase.set(minhaBase, "conexao/status", "conectado");
   // } else {
   // digitalWrite(4,LOW);  
   // }

   Firebase.get(minhaBase, "led/status");
   int led = minhaBase.intData();

   Firebase.get(minhaBase, "led2/status");
   int led2 = minhaBase.intData();

   Firebase.get(minhaBase, "buzzer/status");
   int buzzer = minhaBase.intData();

   Firebase.get(minhaBase, "rele/status");
   int rele = minhaBase.intData();

   switch(led){
    case 0:
     digitalWrite(4,LOW);
     break;

    case 1:
     digitalWrite(4,HIGH);
     break;
    }

   switch(led2){
    case 0:
     digitalWrite(5,LOW);
     break;

    case 1:
     digitalWrite(5,HIGH);
     break;
    }

    
   switch(buzzer){
    case 0:
     digitalWrite(18,LOW);
     break;

    case 1:
     digitalWrite(18,HIGH);
     break;
    }

    
   switch(rele){
    case 0:
     digitalWrite(23,LOW);
     break;

    case 1:
     digitalWrite(23,HIGH);
     break;
    }
   }
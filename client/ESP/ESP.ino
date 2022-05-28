
#include <WiFi.h>
#include <WiFiClient.h> 
#include <HTTPClient.h>
#include <Wire.h>
unsigned long delays =1000;
//#include <Adafruit_BME280.h>
//Cài đặt wifi
const char *ssid = "J14 pro_2.4G";  //ENTER YOUR WIFI SETTINGS
const char *password = "chaocacanhj14";

//Web/Server address to read/write from 
const char *host = "192.168.43.128";   //https://circuits4you.com website or IP address of server

//=======================================================================
//                    Power on setup
//=======================================================================

void setup() {
  delay(1000);
  Serial.begin(115200);
//  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
//  delay(1000);
//  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
}

//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
  HTTPClient http;    //Declare object of class HTTPClient

  String ADCData, station, postData;
  int adcvalue=analogRead(A0);  //Read Analog value of LDR
  ADCData = String(adcvalue);   //String to interger conversion
  station = "A";

  //Post Data
  postData = "nhietdo=" + String(random(30,40))+ "&doam=" + String(random(60,90)) ;
  Serial.println(postData);
  
  http.begin("http://192.168.1.13/interfaceTemperature/sever/api/postESP.php");              //Specify request destination
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    //Specify content-type header

  int httpCode = http.POST(postData);   //Send the request
  String payload = http.getString();    //Get the response payload

  Serial.println(httpCode);   // In mã trả về HTTP
  Serial.println(payload);    //Print request response payload

  http.end();  //Ngắt kết nối
  
  delay(delays);  // Gửi dữ liệu cứ sau 5 giây
}
//=======================================================================

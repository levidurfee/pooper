/*
 *  HTTP over TLS (HTTPS) example sketch
 *
 *  This example demonstrates how to use
 *  WiFiClientSecure class to access HTTPS API.
 *  We fetch and display the status of
 *  esp8266/Arduino project continuous integration
 *  build.
 *
 *  Created by Ivan Grokhotkov, 2015.
 *  This example is in public domain.
 */

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <Time.h>
#include <TimeLib.h>

const char* ssid = "xxxx";
const char* password = "xxxx";

const char* host = "";
const int httpsPort = 443;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate
// DE DF 7B 8D AD 6C 6A 83 37 07 1C 3F 3A 9B 36 EE C5 01 79 1D
const char* fingerprint = "";

int open = 0;

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  Serial.println();
  Serial.print("connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  setTime(10,56,00,9,8,2017);
}

time_t t_now;
int t_weekday, t_hour;

void loop() {
  t_now = now();
  t_weekday = weekday(t_now);
  t_hour = hour(t_now);
  
  if(t_weekday > 1 && t_weekday < 7){
    if(t_hour > 7 && t_hour < 17){
      // Use WiFiClientSecure class to create TLS connection
      WiFiClientSecure client;
      Serial.print("connecting to ");
      Serial.println(host);
      if (!client.connect(host, httpsPort)) {
        Serial.println("connection failed");
        return;
      }
    
      if (client.verify(fingerprint, host)) {
        Serial.println("certificate matches");
      } else {
        Serial.println("certificate doesn't match");
      }
    
      String url = "/status";
      Serial.print("requesting URL: ");
      Serial.println(url);
    
      client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                   "Host: " + host + "\r\n" +
                   "User-Agent: BuildFailureDetectorESP8266\r\n" +
                   "Connection: close\r\n\r\n");
    
      Serial.println("request sent");
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          Serial.println("headers received");
          break;
        }
      }
      String line = client.readStringUntil('\n');
      Serial.println("reply was:");
      Serial.println("==========");
      Serial.println(line);
      if(line == "true") {
        Serial.println("Pooper is open");
        digitalWrite(2, LOW);
      } else {
        Serial.println("Pooper is closed");
        digitalWrite(2, HIGH);
      }
      Serial.println("==========");
      Serial.println("closing connection");
    }
  }
  delay(5000);
}
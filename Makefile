CC=g++
O=-O3

main:
	$(CC) -o build/main $(O) src/cpp/status.cpp src/cpp/main.cpp
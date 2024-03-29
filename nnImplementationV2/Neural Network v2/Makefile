# Makefile for Project Timeline
#
# Your compiler
CXX = g++

# Compilation flags
# '-g' turns debugging flags on.
# Not Using O2 flag for optimisation.
CXXFLAGS = -g -I./  -ljpeg -mavx -lm -lpthread -lX11 -DDLIB_HAVE_BLAS -DNDEBUG  -DDLIB_JPEG_SUPPORT -DDLIB_HAVE_AVX  -O3 `pkg-config --cflags opencv`

# Linker flags
# When you need to add a library
LDFLAGS = -ljpeg -mavx -lm -lpthread -lX11 `pkg-config --libs opencv` -DDLIB_HAVE_BLAS -DNDEBUG  -DDLIB_JPEG_SUPPORT -DDLIB_HAVE_AVX  -O3

# all is a target
# $(VAR) gives value of the variable.
# $@ stores the target
# $^ stores the dependency
all: bin/out bin/test

bin/out: obj/dataReader.o obj/neuralNetwork.o obj/neuralNetworkTrainer.o obj/main.o
	$(CXX) -o $@ $^ $(LDFLAGS)

bin/test: obj/dataReader.o obj/neuralNetwork.o obj/neuralNetworkTrainer.o obj/main2.o
	$(CXX) -o $@ $^ $(LDFLAGS)

obj/dataReader.o: dataReader.cpp
	mkdir -p obj bin
	$(CXX) -c $(CXXFLAGS) -o $@ $<

obj/neuralNetwork.o: neuralNetwork.cpp
	$(CXX) -c $(CXXFLAGS) -o $@ $<

obj/neuralNetworkTrainer.o: neuralNetworkTrainer.cpp
	$(CXX) -c $(CXXFLAGS) -o $@ $<

obj/main.o: main.cpp
	$(CXX) -c $(CXXFLAGS) -o $@ $<

obj/main2.o: main2.cpp
	$(CXX) -c $(CXXFLAGS) -o $@ $<

# .PHONY tells make that 'all' or 'clean' aren't _actually_ files, and always
# execute the compilation action when 'make all' or 'make clean' are used
.PHONY: all oic

# Delete all the temporary files we've created so far
clean:
	rm -rf obj/*.o
	rm -rf bin/oic

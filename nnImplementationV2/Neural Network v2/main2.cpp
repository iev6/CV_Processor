//standard libraries
#include <iostream>
#include <ctime>
#include <stdlib.h>

//custom includes
#include "neuralNetwork.h"
#include "neuralNetworkTrainer.h"

//use standard namespace
using namespace std;

int main()
{		
	//seed random number generator
	srand( (unsigned int) time(0) );
	
	//create data set reader and load data file
	//dataReader d;
	//d.loadDataFile("weights.csv",16,3);
	//d.setCreationApproach( STATIC, 10 );	

	//create neural network
	char filename[] = "weights.csv";
	double pattern[] = {2,8,3,5,1,8,13,0,6,6,10,8,0,8,0,8};

	neuralNetwork nn(16,10,3);
	nn.loadWeights(filename);
	int *p = nn.feedForwardPattern(pattern);
	for(int i=0; i<3; i++) {
		cout<<*(p+i)<<endl;
	}
	return 0;
}

/*******************************************************************
* Neural Network Training Example
* ------------------------------------------------------------------
* Bobby Anguelov - takinginitiative.wordpress.com (2008)
* MSN & email: banguelov@cs.up.ac.za
*********************************************************************/

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
	dataReader d;
	d.loadDataFile("letter-recognition-2.csv",16,3);
	d.setCreationApproach( STATIC, 10 );	

	//create neural network
	neuralNetwork nn(16,10,3);

	//create neural network trainer
	neuralNetworkTrainer nT( &nn );
	// learningRate, momentum
	nT.setTrainingParameters(0.001, 0.9, false);
	// epochs, desiredAccuracy
	nT.setStoppingConditions(10000, 90);
	nT.enableLogging("log.csv", 5);
	
	//train neural network on data sets
	for (int i=0; i < d.getNumTrainingSets(); i++ )
	{
		nT.trainNetwork( d.getTrainingDataSet() );
	}	

	//save the weights
	nn.saveWeights("weights.csv");
		
	cout << endl << endl << "-- END OF PROGRAM --" << endl;
	char c; cin >> c;

	return 0;
}

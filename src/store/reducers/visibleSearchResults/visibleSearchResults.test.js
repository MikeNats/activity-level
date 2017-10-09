import { 
  SET_VISIBLE_SEARCH_RESULTS ,
  SET_INITIAL_VISIBLE_SEARCH_RESULTS
} from '../../actions/visibleSearchResults/visibleSearchResults';
import { 
	visibleSearchResults, defaultAction
} from './visibleSearchResults';

let testDataSet = [{
    "id": 1,
    "name": "Angela",
    "gender": "male",
    "birthDate": "1986-05-09",
    "heightCm": 193,
    "weightKg": 69.6,
    "bmi": 18.6
  },
  { 
    "id": 2,
    "name": "Zoro",
    "gender": "female",
    "birthDate": "1984-11-18",
    "heightCm": 159,
    "weightKg": 30,
    "bmi": 4.6
  },
  {
    "id": 3,
    "name": "Mario",
    "gender": "female",
    "birthDate": "1979-07-28",
    "heightCm": 156,
    "weightKg": 47.5,
    "bmi": 2.5
  }]; 

describe('setVisibleSearchResults Reducer', () => {
    defaultAction.dataToSearch = testDataSet;


    describe('Action type is not supported ', () => {
        defaultAction.type = "UNSUPPORTED";
    	it('should return the default state', () => {
    		expect(visibleSearchResults([], defaultAction)).toEqual([]);
    	});
    }); 

    describe('Action type is SET_INITIAL_VISIBLE_SEARCH_RESULTS ', () => {

        it('should return given state sorted by name', () => {
            defaultAction.type = SET_INITIAL_VISIBLE_SEARCH_RESULTS; 
            
            expect(visibleSearchResults(testDataSet, defaultAction)[0].id).toEqual(1);
            expect(visibleSearchResults(testDataSet, defaultAction)[1].id).toEqual(3);
            expect(visibleSearchResults(testDataSet, defaultAction)[2].id).toEqual(2);
        });       
    });
    describe('Action type is SET_VISIBLE_SEARCH_RESULTS', () => {
        describe('searchTerm', () => {
            describe('is empty string', () => {
                it('should return data initial data provided', () => {
                    defaultAction.type = SET_VISIBLE_SEARCH_RESULTS;
                    defaultAction.searchTerm = ''; 
                    defaultAction.criterias.orderBy.attribute = '';

                    expect(visibleSearchResults([], defaultAction)).toEqual(testDataSet);
                });  
            });
            describe('is NOT empty string', () => {
                describe('criteria is name', () => {
                    describe('and match with name', () => {

                        it('should return matched products', () => {
                            defaultAction.searchTerm = 'Angela';  
                  
                            expect(visibleSearchResults([], defaultAction).length).toEqual(1);
                        }); 
                    });
                    describe('and do NOT match with name', () => {

                        it('should return no products', () => {
                            defaultAction.searchTerm = 'qwerty';  
                  
                            expect(visibleSearchResults([], defaultAction).length).toEqual(0);
                        }); 
                    });
                });
            });   
        }); 
        describe('orderBy', () => {
            describe('attribute is gender', () => {
                describe('descending', () => {
                    it('should order accordingly', () => { 
                        defaultAction.type = "SET_VISIBLE_SEARCH_RESULTS";
                        defaultAction.searchTerm = '';
                        defaultAction.criterias.orderBy.attribute = 'gender'; 
                       
                        expect(visibleSearchResults(testDataSet, defaultAction)[0].gender).toEqual(testDataSet[1].gender);
                        expect(visibleSearchResults(testDataSet, defaultAction)[1].gender).toEqual(testDataSet[2].gender);
                        expect(visibleSearchResults(testDataSet, defaultAction)[2].gender).toEqual(testDataSet[0].gender); 
                    });
                });  
                describe('acceding', () => {
                    it('should order accordingly', () => { 
                        defaultAction.criterias.orderBy.descending = false;  
                        defaultAction.criterias.orderBy.attribute = 'gender';  
    
                        expect(visibleSearchResults(testDataSet, defaultAction)[0].gender).toEqual(testDataSet[0].gender);
                        expect(visibleSearchResults(testDataSet, defaultAction)[1].gender).toEqual(testDataSet[1].gender);
                        expect(visibleSearchResults(testDataSet, defaultAction)[2].gender).toEqual(testDataSet[2].gender);
                    });          
                });
            });
            describe('attribute is birthDate', () => {
                describe('descending', () => {
                    it('should order accordingly', () => { 
                        defaultAction.criterias.orderBy.descending = true; 
                        defaultAction.criterias.orderBy.attribute = 'birthDate'; 
                           
                        expect(visibleSearchResults(testDataSet, defaultAction)[0].birthDate).toEqual(testDataSet[2].birthDate);
                        expect(visibleSearchResults(testDataSet, defaultAction)[1].birthDate).toEqual(testDataSet[1].birthDate);
                        expect(visibleSearchResults(testDataSet, defaultAction)[2].birthDate).toEqual(testDataSet[0].birthDate); 
                    });
                });
                describe('acceding', () => {
                    it('should order accordingly', () => { 
                        defaultAction.criterias.orderBy.descending = false; 
                           
                        expect(visibleSearchResults(testDataSet, defaultAction)[0].birthDate).toEqual(testDataSet[0].birthDate);
                        expect(visibleSearchResults(testDataSet, defaultAction)[1].birthDate).toEqual(testDataSet[1].birthDate);
                        expect(visibleSearchResults(testDataSet, defaultAction)[2].birthDate).toEqual(testDataSet[2].birthDate); 
                    });
                });
            });
            describe('attribute is heightCm/weightKg/bmi', () => {
                let factors = ['heightCm', 'weightKg', 'bmi'];

                describe('descending', () => {
                    it('should order accordingly', () => { 
                        defaultAction.criterias.orderBy.descending = true; 
                        factors.forEach((factor) => {
                            defaultAction.criterias.orderBy.attribute = 'factor';

                            expect(visibleSearchResults(testDataSet, defaultAction)[0][factor]).toEqual(testDataSet[0][factor]);
                            expect(visibleSearchResults(testDataSet, defaultAction)[1][factor]).toEqual(testDataSet[1][factor]);
                            expect(visibleSearchResults(testDataSet, defaultAction)[2][factor]).toEqual(testDataSet[2][factor]); 
                        });      
                    });
                });
                describe('acceding', () => {
                    it('should order accordingly', () => { 
                        defaultAction.criterias.orderBy.descending = false; 
                        factors.forEach((factor) => {
                            defaultAction.criterias.orderBy.attribute = 'factor';

                            expect(visibleSearchResults(testDataSet, defaultAction)[0][factor]).toEqual(testDataSet[2][factor]);
                            expect(visibleSearchResults(testDataSet, defaultAction)[1][factor]).toEqual(testDataSet[1][factor]);
                            expect(visibleSearchResults(testDataSet, defaultAction)[2][factor]).toEqual(testDataSet[0][factor]); 
                        });      
                    });   
                });
            });
        });
     });
});

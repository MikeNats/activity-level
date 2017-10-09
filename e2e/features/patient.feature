Feature: Patient panel
    As a user
    I want to be able to see/hide patient status

    Scenario: user wants to see patient panel
        Given the user is in "search page" 
        When user query is "Gregor van Vloten"
        And user clicks ".list-item" button
        Then ".patient" item will "be" vissible
          

    Scenario: user wants to close patient panel
        Given the user is in "search page" 
        When user query is "Gregor van Vloten"
        And user clicks ".list-item" button
		And user clicks ".hidePatient" button
        Then ".patient" item will "not be" vissible
Feature: Search list find by term
    As a user
    I want to be able to find the items of my choice

    Scenario: Item not found
        Given the user is in "search page" 
        When user query is "nopatient"
        Then the error message "No results found" is displayed
   
    Scenario: Item found
 
        When user query is "Gregor van Vloten"
        Then "only one" items will be vissible
        And visible "item" title will contains "Gregor van Vloten"

    Scenario: User deletes his existing query

        When user query is "empty string"
        Then "all" items will be vissible
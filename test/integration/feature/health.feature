Feature: Health check

Scenario: Health check
    When I check server's health
    Then I get a 200 response and a json with ok flag set to true

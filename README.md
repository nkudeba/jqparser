# Automated .json parser for node-jq

## How to use

## Initial setup
1. Install node
1. Clone repo 
1. Run npm install

## For each .json update
1. Copy your .json into the root folder of the repo
1. Copy your jq filters, with each filter on a new line. For instance, you can copy them directly from Excel or Google Sheets rows.
1. Paste them into a text file in the root folder of the repo you just cloned (for instance in commands.txt)
1. Run `node ConfigParser <myconfigfile.json> <mycommands.txt>`. For instance, `node ConfigParser data.json commands.txt`.


## About

This project leverages jq. To practice creating jq filters, visit [jqplay.org](https://jqplay.org/)

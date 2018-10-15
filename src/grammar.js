import { grammar } from '@aureooms/js-grammar' ;

const root = "document" ;
const start = "contents" ;
const eof = "%" ;
const productions = {
  "document" : {
    "contents" : [ "&anything" , "=%" ] ,
  } ,
  "anything" : {
    "starts-with-othercmd" : [ '&othercmd' , "&cmdafter" ] ,
    "starts-with-environment" : [ "&begin-environment" , "&cmdafter", "&end-environment", "&anything" ] ,
    "starts-with-*" : [ '&*' , "&anything" ] ,
    "starts-with-[" : [ '&[' , "&anything" ] ,
    "starts-with-]" : [ '&]' , "&anything" ] ,
    "starts-with-a-group" : [ '&group' , '&anything' ] ,
    "starts-with-something-else" : [ "&something-else" , "&anything" ] ,
    "end" : [ ] , // 0.1
  } ,
  "anything-but-]" : {
    "starts-with-othercmd" : [ '&othercmd' , "&cmdafter-but-not-]" ] ,
    "starts-with-environment" : [ "&begin-environment" , "&cmdafter-but-not-]", "&end-environment", "&anything-but-]"] ,
    "starts-with-*" : [ '&*' , "&anything-but-]" ] ,
    "starts-with-[" : [ '&[' , "&anything-but-]" ] ,
    "starts-with-a-group" : [ '&group' , '&anything-but-]' ] ,
    "starts-with-something-else" : [ "&something-else" , "&anything-but-]" ] ,
    "end" : [ ] ,
  } ,
  "group" : {
    "group" : [ '={' , '&anything' , '=}' ] ,
  } ,
  "optgroup" : {
    "group" : [ '=[' , "&anything-but-]" , '=]' ] ,
  } ,
  "othercmd" : {
    "othercmd" : [ '=othercmd' , "&cmd*" , "&cmdargs" ] ,
  },
  "begin-environment" : {
    "begin-environment" : [ "=begin", '={' , "=text" , '=}' , "&cmdargs"] ,
  } ,
  "end-environment" : {
    "end-environment" : [ "=end", '={' , "=text" , '=}'] ,
  } ,
  "*" : {
    "*" : [ '=*' ] ,
  } ,
  "[" : {
    "[" : [ '=[' ] ,
  } ,
  "]" : {
    "]" : [ '=]' ] ,
  } ,
  "something-else" : {
    "text" : [ '=text' ] , // 1.0
    "newif" : [ '=newif' , '=ifcmd' ] , // 1.1
    "ifcmd" : [ '=ifcmd' , "&anything" , "&endif" ] , // 1.2
    "falsecmd" : [ '=falsecmd' ] , // 1.3
    "truecmd" : [ '=truecmd' ] , // 1.4
    "comment" : [ '=comment' ] , // 1.5
    "def" : [ '=def' , '=othercmd' , '={' , "&anything" , '=}' ] , // 1.7
    "newcommand" : [ '=newcommand' , "&cmddef" ] , // 1.8
    "renewcommand" : [ '=renewcommand' , "&cmddef" ] ,
    "newenvironment" : [ '=newenvironment' , "&environment-definition" ] ,
    "renewenvironment" : [ '=renewenvironment' , "&environment-definition" ] ,
    "\n" : [ '=\n' ] ,
    "arg" : [ '=arg' ] , // 1.12
    "$" : [ '=$' ] ,
    "math" : [ '=\\(' , '&anything' , '=\\)' ] ,
    "mathenv" : [ '=\\[' , '&anything' , '=\\]' ] ,
  } ,
  "endif" : { // endif : 2
    "elsefi" : [ '=else' , "&anything" , '=fi' ] , // 2.0
    "fi" : [ '=fi' ] , // 2.1
  } ,
  "cmddef" : { // command definition 3
    "{cmd}[x]{anything}" : [ '={' , '=othercmd' , '=}' , "&cmddefargs" , '={' , "&anything" , '=}' ] ,
    "cmd[x]{anything}" : [ '=othercmd' , "&cmddefargs" , '={' , "&anything" , '=}' ] ,
    "*cmd[x]{anything}" : [ '=*' , '=othercmd' , "&cmddefargs" , '={' , "&anything" , '=}' ] ,
  } ,
  "cmddefargs" : { // command definition arguments 4
    "yes" : [ '=[' , '=text' , '=]' ] , // 4.0
    "no" : [ ] , // 4.1
  } ,
  "environment-definition" : {
    "{envname}[nargs][default]{begin}{end}" : [ '={' , '=text' , '=}' , "&arguments-for-environment-definition" , '={' , "&anything" , '=}' , '={' , "&anything" , '=}' ] ,
    "*{envname}[nargs][default]{begin}{end}" : [ '=*' , '={' , '=text' , '=}' , "&arguments-for-environment-definition" , '={' , "&anything" , '=}' , '={' , "&anything" , '=}' ] ,
  } ,
  "arguments-for-environment-definition" : {
    "yes" : [ '=[' , '=text' , '=]' , '&default-argument-for-environment-definition' ] ,
    "no" : [ ] ,
  } ,
  "default-argument-for-environment-definition" : {
    "yes" : [ '=[' , '&anything-but-]' , '=]' ] ,
    "no" : [ ] ,
  } ,
  "cmd*" : { // othercmd star : 5
    "yes" : [ '=*' ] , // 5.0
    "no" : [ ] , // 5.1
  } ,
  "cmdargs" : { // othercmd arguments : 7
    "normal" : [ "&group" , "&cmdargs" ] ,
    "optional" : [ "&optgroup" , "&cmdargs" ] ,
    "end" : [ ] , // 7.1
  } ,
  "cmdafter" : { // after othercmd
    "othercmd" : [ "&othercmd" , "&cmdafter" ] ,
    "]-then-anything" : [ "&]" , "&anything" ] ,
    "something-else-then-anything" : [ "&something-else" , "&anything" ] ,
    "nothing" : [ ] ,
  } ,
  "cmdafter-but-not-]" : { // after othercmd
    "othercmd" : [ "&othercmd" , "&cmdafter-but-not-]" ] ,
    "something-else-then-anything" : [ "&something-else" , "&anything-but-]" ] ,
    "nothing" : [ ] ,
  } ,
} ;

export default grammar.from( { root , start , eof , productions } ) ;

#!/bin/sh

SCRIPT_NAME=digest.sh
EXECUTABLE_CLASS=org.jasypt.intf.cli.JasyptStringDigestCLI
BIN_DIR=`dirname $0`
DIST_DIR=$BIN_DIR/..
LIB_DIR=$DIST_DIR/lib
EXEC_CLASSPATH="."

if [ -n "$JASYPT_CLASSPATH" ]
then
  EXEC_CLASSPATH=$EXEC_CLASSPATH:$JASYPT_CLASSPATH
fi

for a in `find $LIB_DIR -name '*.jar'`
do
  EXEC_CLASSPATH=$EXEC_CLASSPATH:$a
done

JAVA_EXECUTABLE=java
if [ -n "$JAVA_HOME" ]
then
  JAVA_EXECUTABLE=$JAVA_HOME/bin/java
fi

JCE_PROVIDER="providerClassName=org.bouncycastle.jce.provider.BouncyCastleProvider"

$JAVA_EXECUTABLE -classpath $EXEC_CLASSPATH $EXECUTABLE_CLASS $SCRIPT_NAME $JCE_PROVIDER "$@"

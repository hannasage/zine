#!/bin/bash
IMPORT="import { COMPONENT_NAME } from \"./COMPONENT_TYPE/COMPONENT_NAME\";"
EXPORT="export { COMPONENT_NAME };"
FILE_EXTENSION=""

read -p "Type (logic or block): " componentType
read -p "Name: " componentName

if [[ -z $componentType ]] || [[ -z $componentName ]]
then
  echo "ERROR, requires inputs: [type] [Name]"
  exit 1
elif [[ $componentType != "logic" ]] && [[ $componentType != "block" ]]
then
  echo "ERROR, valid [type] args: logic, block"
  exit 1
fi

if [[ $componentType != "logic" ]]
then
  FILE_EXTENSION="ts"
else
  FILE_EXTENSION="tsx"
fi

touch ../../src/components/$componentType/$componentName.$FILE_EXTENSION
sed -e "s/COMPONENT_NAME/$componentName/g" ./code-templates/$componentType.$FILE_EXTENSION > ../../src/components/$componentType/$componentName.$FILE_EXTENSION

echo $IMPORT|cat - ../../src/components/index.ts > /tmp/out && mv /tmp/out ../../src/components/index.ts
echo $EXPORT >> ../../src/components/index.ts
sed -i.old "s/COMPONENT_NAME/$componentName/g" ../../src/components/index.ts
sed -i.old "s/COMPONENT_TYPE/$componentType/g" ../../src/components/index.ts
rm ../../src/components/index.ts.old

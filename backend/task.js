import { ListTablesCommand,DynamoDBClient } from "@aws-sdk/client-dynamodb";
import{
    UpdateCommand,
    PutCommand,
    DynamoDBDocumentClient,
    ScanCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb'
import crypto from "crypto";
const client = new DynamoDBClient({region:"us-east-1"});
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks =async () =>{
    const command = new ScanCommand({
        ExpressionAttributeNames: {"#name":"name"},
        ProjectionExpression: "id, #name,completed",
        TableName:"Tasks",
    });
    const response = await docClient.send(command);
    return response;
};

export const createTasks = async ({name,completed}) => {
    const uuid = crypto.randomUUID();
    /*{We use the put command to put things on the database}*/
    const command = new PutCommand({
        /*{We are writing what we are writing in the database so whether it be tablename and the entries which has id, name, and completed}*/
        TableName: "Tasks",
        Item: {
            id: uuid,
            name,
            completed
        }

    })
    const response = await docClient.send(command);
    return response;

};

export const updateTasks = async ({id,name,completed}) => {
    const command = new UpdateCommand({
        TableName:"Tasks",
        Key: {
            id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        /*{:n and :c are two placeholders}*/
        UpdateExpression: "set #name = :n,completed = :c",
        /*{Making sure we are mapping the placeholders with the parameters we ar passing}*/
        ExpressionAttributeValues: {
            ":n":name,
            ":c": completed
        },
        ReturnValues: "ALL_NEW"
        

    })
    const response = await docClient.send(command);
    return response;

};

export const deleteTasks = async (id) => {
    const command = new DeleteCommand({
        TableName: "Tasks",
        Key: {
            id,
        },
    });
    const response = await docClient.send(command);
    return response;
}
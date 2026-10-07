import {Button} from "@/components/ui/button";
import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";


function QuizSettings() {


    function handleSubmit(event: React.SubmitEvent){
        event.preventDefault();

    }

    return (
        <Card className="mx-auto mt-4 w-full max-w-lg p-6">
            <CardHeader>
                <CardTitle>Quizets inställningar</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Välj kategori"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="djur">Djur</SelectItem>
                    <SelectItem value="sport">Sport</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Välj antal frågor"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">3</SelectItem>
                    <SelectItem value="fem">5</SelectItem>
                    <SelectItem value="tio">10</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Välj svårighetsgrad"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Lätt</SelectItem>
                    <SelectItem value="medium">Medel</SelectItem>
                    <SelectItem value="hard">Svår</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" className="ml-20 mr-20"> Starta Quiz</Button>
                </CardContent>
        </Card>
    );

}

export default QuizSettings;

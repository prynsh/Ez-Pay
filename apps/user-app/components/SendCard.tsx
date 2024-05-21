"use client"
// import { Button } from "@repo/ui/button";
// import { Card } from "@repo/ui/card";
// import { Center } from "@repo/ui/center";
// import { TextInput } from "@repo/ui/textinput";
// import { useState } from "react";
// import { p2pTransfer } from "../app/lib/actions/p2ptransfer";
// import React from 'react';
// import {message}  from 'antd';

// export function SendCard() {
//     const [number, setNumber] = useState("");
//     const [amount, setAmount] = useState("");

//     return <div className="h-[90vh]">
//         <Center>
//             <Card title="Send">
//                 <div className="min-w-72 pt-2">
//                     <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
//                         setNumber(value)
//                     }} />
//                     <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
//                         setAmount(value)
//                     }} />
//                     <div className="pt-4 flex justify-center">
//                         <Button onClick={async () => {
//                             await p2pTransfer(number,Number(amount)*100);
//                             message.success("Completed")
//                         }}>Send</Button>
//                     </div>
//                 </div>
//             </Card>
//         </Center>
//     </div>
// }
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2ptransfer";
import React, { useState } from 'react';
import { message } from 'antd';

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = async () => {
        try {
            await p2pTransfer(number, Number(amount) * 100);
          
            message.success("Transaction completed successfully");
        } catch (error) {
            message.error("Transaction failed. Please try again.");
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                            setNumber(value);
                        }} />
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                            setAmount(value);
                        }} />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}


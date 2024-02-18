import { NextResponse } from "next/server";
import prisma from "../../../../prisma/index";
export async function POST(req) {
  try {
    const { amount, bankId } = await req.json();
    const floatAmount = parseFloat(amount);

    console.log("deposting money in the created bank", amount, bankId);
    const depostedMoney = await prisma.transaction.create({
      data: {
        amount: floatAmount,
        piggyBankId: bankId,
        
      },
    });
    return NextResponse.json({ depostedMoney: depostedMoney }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Bank creation failed" },
      { status: 500 }
    );
  }
}

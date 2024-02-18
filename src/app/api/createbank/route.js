import { NextResponse } from "next/server";
import prisma from "../../../../prisma/index";
export async function POST(req, res) {
  try {
    const { balance, isBroken } = await req.json();

    const floatBalance = parseFloat(balance);
    console.log("Creating bank in backend", balance, isBroken);
    const bank = await prisma.piggyBank.create({
      data: {
        totalMoney: floatBalance,
        isBroken: isBroken,
      },
    });

    return NextResponse.json({ bank: bank }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Bank creation failed" },
      { status: 500 }
    );
  }
}

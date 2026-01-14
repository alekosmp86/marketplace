import { RequestStatus } from "../../types/RequestStatus";
import { DailyReportService } from "./services/DailyReportService";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const report = await DailyReportService.getDailyReport();
    return NextResponse.json(
      { message: RequestStatus.SUCCESS, data: report },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};

-- CreateTable
CREATE TABLE "Risk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "probability_before" DOUBLE PRECISION NOT NULL,
    "time_recovery_before" DOUBLE PRECISION NOT NULL,
    "costs_recovery_after" DOUBLE PRECISION NOT NULL,
    "costs_recovery_before" DOUBLE PRECISION NOT NULL,
    "measure_probability_presence" TEXT NOT NULL,
    "probability_after" DOUBLE PRECISION NOT NULL,
    "time_recovery_after" DOUBLE PRECISION NOT NULL,
    "business_process" TEXT NOT NULL,
    "risk_owner" TEXT NOT NULL,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "risk" TEXT NOT NULL,
    "riskNum" TEXT NOT NULL,
    "probabilityBefore" DOUBLE PRECISION NOT NULL,
    "probabilityAfter" DOUBLE PRECISION NOT NULL,
    "lossesBefore" DOUBLE PRECISION NOT NULL,
    "lossesAfter" DOUBLE PRECISION NOT NULL,
    "riskAssessmentBefore" DOUBLE PRECISION NOT NULL,
    "riskAssessmentAfter" DOUBLE PRECISION NOT NULL,
    "startDate" DOUBLE PRECISION NOT NULL,
    "endDate" TEXT NOT NULL,
    "totalCost" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

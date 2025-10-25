#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Running All Tests for 8Pods${NC}\n"

# Function to run tests
run_tests() {
    local component=$1
    local command=$2

    echo -e "${YELLOW}Testing ${component}...${NC}"
    if eval "$command"; then
        echo -e "${GREEN}✅ ${component} tests passed${NC}\n"
        return 0
    else
        echo -e "${RED}❌ ${component} tests failed${NC}\n"
        return 1
    fi
}

# Track failures
FAILED=0

# Frontend Tests
echo -e "${YELLOW}═══════════════════════════════════${NC}"
echo -e "${YELLOW}      FRONTEND TESTS                ${NC}"
echo -e "${YELLOW}═══════════════════════════════════${NC}\n"

cd frontend || exit 1

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

run_tests "Frontend Unit Tests" "npm test -- --passWithNoTests" || FAILED=$((FAILED+1))

cd ..

# Backend Tests
echo -e "${YELLOW}═══════════════════════════════════${NC}"
echo -e "${YELLOW}      BACKEND TESTS                 ${NC}"
echo -e "${YELLOW}═══════════════════════════════════${NC}\n"

cd backend || exit 1

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
fi

run_tests "Backend Unit Tests" "npm test" || FAILED=$((FAILED+1))
run_tests "Backend E2E Tests" "npm run test:e2e" || FAILED=$((FAILED+1))

cd ..

# Summary
echo -e "${YELLOW}═══════════════════════════════════${NC}"
echo -e "${YELLOW}      TEST SUMMARY                  ${NC}"
echo -e "${YELLOW}═══════════════════════════════════${NC}\n"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ $FAILED test suite(s) failed${NC}"
    exit 1
fi


# Set Cluster

ecs-cli configure --region ap-northeast-2 --cluster recruit-api --default-launch-type FARGATE

# ECS Cluster 생성
ecs-cli up --vpc vpc-0dfa4527b6c72f16f --security-group sg-0885f0847b5ba68e5 --subnets subnet-0981e2a80e0016ada,subnet-0bb8d69bd5cc33ed7,subnet-0b5f0743c73bdc880 || true;
# Build Images
docker-compose -f ./packages/api/ci/docker-compose.yml build

# Push to ECR
ecs-cli push 107835905686.dkr.ecr.ap-northeast-2.amazonaws.com/recruit-api

# # ECS Production용 Service 배포
ecs-cli compose --project-name recruit-api \
-f ./packages/api/ci/docker-compose.yml \
--ecs-params ./packages/api/ci/ecs-params.yml \
service up  \
--launch-type FARGATE \
--timeout 10 \
--target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:107835905686:targetgroup/ecs-talent-recruit-api/378e39a056195de4 \
--container-port 80 \
--container-name recruit-api

FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/medikart-0.0.1-SNAPSHOT.jar"] 
FROM openjdk:17

ARG JAR_FILE=build/libs/sandle-app-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} sandle-app.jar

ENTRYPOINT [ "java", "-jar", "sandle-app.jar" ]

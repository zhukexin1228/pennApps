import matplotlib.pyplot as plt
import sklearn
from sklearn.neural_network import MLPRegressor
mlp = MLPClassifier(hidden_layer_sizes=(8, 8, 8),
                    activation='relu', solver='adam', max_iter=500)
mlp.fit(X_train, y_train)

predict_train = mlp.predict(X_train)
predict_test = mlp.predict(X_test)

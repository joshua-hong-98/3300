import matplotlib.pyplot as plt
import numpy as np
import math
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.naive_bayes import GaussianNB


def plot_consine_similarity(similarity_matrix, classes, title='Consine Similarity'):
    """ Plot the cosine similarity matrix.
    """

    plt.imshow(similarity_matrix, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title('Cosine Similarity')
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=90)
    plt.yticks(tick_marks, classes)

    plt.tight_layout()
    plt.show()


def plot_wifi_hotspot_signal_strengths(features, labels, label_names):
  """ Histogram of the wifi access point signal strength.
  """

  subplots_per_row = 3
  rows = int(math.ceil(len(labels)/subplots_per_row))

  fig, axarr = plt.subplots(rows, subplots_per_row, sharex=True, sharey=True)

  for i in range(len(labels)):
    row = int(i/subplots_per_row)
    col = i % subplots_per_row
    # Change the sign of wifi signal strength
    axarr[row, col].bar(range(len(label_names)), features[i, :])
    axarr[row, col].set_title(labels[i], fontsize=8)
    axarr[row, col].set_xticklabels(label_names, rotation='vertical', fontsize=8)
    axarr[row, col].set_ylabel('dBm')


  plt.show()


def extract_wifi_location_features(fileName):
  """ Extract the features (the wifi signal strength of different wifi hotspots)

    Returns:
      features: The signal strength of different wifi hotspots.
      labels: The location names.
      feature_names: mac addresses.
  """

  labels = dict()
  mac_addresses = dict()

  # Construct the feature dimension and labels
  file = open(fileName, 'r')
  for line in file:
    if line != '\n':
      # Line starting with ~^~ means location (label). Otherwise it means mac address.
      if line[0:3] == '~^~':
        location_name = line[4:-4] + '_' + str(len(labels))

      else:
        mac_addresss = line.split('~~')[0]
        if mac_addresss not in mac_addresses:
          mac_addresses[mac_addresss] = len(mac_addresses)

  file.close()

  # Construct the features and corresponding labels
  labels = list()
  features = None
  current_features = None
  file = open(fileName, 'r')
  for line in file:
    if line != '\n':
      if line[0:3] == '~^~':
        labels.append(line[3:-4])

        # If it's not the first label in the file,
        # append current features (features constructed for the last label) to the global features
        if current_features is not None:

          if features is None:
            features = current_features
          else:
            features = np.append(features, current_features, axis=0)

        current_features = np.empty((1, len(mac_addresses)))
        current_features[:] = np.nan

      else:
        mac_address = line.split('~~')[0]
        strength = float(line.split('~~')[-1])
        current_features[0, mac_addresses[mac_address]] = strength

  # Add the features for the last wifi location to the entire features set
  features = np.append(features, current_features, axis=0)

  return features, labels, mac_addresses.keys()


if __name__ == "__main__":
  # Change the file name
  fileName = "./a3_josh_data.txt"
  file2 = "./a3_josh_and_adrian_data.txt"

  # Each row of "features" contains scan results for each wifi scan,
  # and each row of "labels" contains scan name for each wifi scan.

  features, labels, label_names = extract_wifi_location_features(fileName)
  features2, labels2, label_names2 = extract_wifi_location_features(file2)

  # Plot the histogram of wifi hotspot signal strengh.
  # You can comment it out if you don't want the plot to be shown.
  # plot_wifi_hotspot_signal_strengths(features, labels, label_names)

  # -100 dBm means no signal at all
  features[np.isnan(features)] = -100
  features2[np.isnan(features2)] = -100

  #TODO 1: Compute the cosine similarity matrix of your own wifi signal strength
# def cosine_similarity(a,b):
#   numerator = np.dot(a,b)
#   x = np.sqrt(np.sum(np.square(a)))
#   y = np.sqrt(np.sum(np.square(b)))
#   denominator = x*y 
#   return numerator/denominator  

def new_matrix(num):
  matrix=np.zeros((num.shape[0], num.shape[0]))
  for x in range(num.shape[0]):
    for y in range(num.shape[0]):
      matrix[x,y]=cosine_similarity(num[x,:],num[y,:])
  return matrix

similarity_matrix = new_matrix(features)
plot_consine_similarity(similarity_matrix, labels)

print(new_matrix(features).shape[0])
  #TODO 2: Compute the cosine similarity matrix of two different people's wifi scans
similarity_matrix2 = new_matrix(features2)
plot_consine_similarity(similarity_matrix2, labels2)

  #TODO 3: Classify the location of the other person
clf= GaussianNB()
clf.fit(np.array(features2[:14]), np.array(labels2[:14]))
for i in range(14,35):
    print(clf.predict(features2[i]))